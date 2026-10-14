import { useState, useMemo } from 'react';
import { Search, X, RotateCcw, History, Eye, Trash2, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { DataTable } from '@/components/tables/DataTable';
import { Pagination } from '@/components/tables/Pagination';
import { useToast } from '@/components/ui/Toast';
import '@/pages/PredictionHistory.css';
import { historyData } from '@/data/mockData';
import type { PredictionRecord } from '@/types';

const PAGE_SIZE = 10;

export function PredictionHistoryPage() {
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState('');
  const [sortKey, setSortKey] = useState('timestamp');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecord, setSelectedRecord] = useState<PredictionRecord | null>(null);

  const filtered = useMemo(() => {
    let data = [...historyData];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.outcome.toLowerCase().includes(q) ||
          r.modelVersion.toLowerCase().includes(q)
      );
    }
    if (typeFilter) data = data.filter((r) => r.type === typeFilter);
    if (outcomeFilter === 'Yes') data = data.filter((r) => r.outcome === 'Yes');
    if (outcomeFilter === 'No') data = data.filter((r) => r.outcome === 'No');

    data.sort((a, b) => {
      const aVal = String(a[sortKey as keyof PredictionRecord] ?? '');
      const bVal = String(b[sortKey as keyof PredictionRecord] ?? '');
      const cmp = aVal.localeCompare(bVal);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return data;
  }, [search, typeFilter, outcomeFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleReset = () => {
    setSearch('');
    setTypeFilter('');
    setOutcomeFilter('');
    setSortKey('timestamp');
    setSortDir('desc');
    setCurrentPage(1);
  };

  const hasActiveFilter = search || typeFilter || outcomeFilter;

  const columns = [
    { key: 'id', label: 'Prediction ID', sortable: true, render: (row: Record<string, unknown>) => <span className="history-row-id">{String(row.id)}</span> },
    { key: 'type', label: 'Type', sortable: true, render: (row: Record<string, unknown>) => <Badge variant={row.type === 'Readmission' ? 'primary' : 'teal'}>{String(row.type)}</Badge> },
    { key: 'outcome', label: 'Outcome', sortable: true, render: (row: Record<string, unknown>) => {
      const outcome = String(row.outcome);
      const variant = outcome === 'Yes' ? 'error' : outcome === 'No' ? 'success' : 'neutral';
      return <Badge variant={variant} dot>{outcome}</Badge>;
    } },
    { key: 'value', label: 'Value', sortable: false, render: (row: Record<string, unknown>) => <span style={{ fontWeight: 500 }}>{String(row.value)}</span> },
    { key: 'modelVersion', label: 'Model', sortable: true, render: (row: Record<string, unknown>) => <span style={{ color: 'var(--text-secondary)' }}>{String(row.modelVersion)}</span> },
    { key: 'timestamp', label: 'Timestamp', sortable: true, render: (row: Record<string, unknown>) => <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{String(row.timestamp)}</span> },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (row: Record<string, unknown>) => (
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          <button className="neu-icon-btn" style={{ width: 32, height: 32 }} onClick={() => setSelectedRecord(row as unknown as PredictionRecord)} aria-label="View details">
            <Eye size={15} />
          </button>
          <button
            className="neu-icon-btn"
            style={{ width: 32, height: 32, color: 'var(--error)' }}
            onClick={() => showToast('info', `Record ${String(row.id)} cannot be deleted in demo mode.`)}
            aria-label="Delete record"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Prediction History"
        subtitle="Browse, search, and filter past prediction records (demonstration data)."
      />

      <div className="history-demo-label">
        <Sparkles size={12} />
        Demonstration records — no real patient-identifying information is displayed
      </div>

      <div className="history-filters">
        <div className="history-search">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by ID, type, outcome…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            aria-label="Search prediction history"
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')} aria-label="Clear search">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="history-select">
          <Select placeholder="All types" value={typeFilter} options={[{ label: 'Readmission', value: 'Readmission' }, { label: 'Length of Stay', value: 'Length of Stay' }]} onChange={(v) => { setTypeFilter(v); setCurrentPage(1); }} />
        </div>
        <div className="history-select">
          <Select placeholder="All outcomes" value={outcomeFilter} options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]} onChange={(v) => { setOutcomeFilter(v); setCurrentPage(1); }} />
        </div>
        {hasActiveFilter && (
          <Button variant="ghost" size="sm" icon={<RotateCcw size={14} />} onClick={handleReset}>Reset</Button>
        )}
      </div>

      <Card>
        {pageData.length === 0 ? (
          <EmptyState
            icon={<History size={28} />}
            title="No predictions found"
            message="No records match your current filters. Try adjusting your search or resetting filters."
            action={hasActiveFilter ? <Button variant="ghost" size="sm" icon={<RotateCcw size={14} />} onClick={handleReset}>Reset Filters</Button> : undefined}
          />
        ) : (
          <DataTable
            columns={columns}
            data={pageData as unknown as Record<string, unknown>[]}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={handleSort}
          />
        )}
        <div className="history-info">
          <span className="history-info-text">
            Showing {pageData.length > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{(currentPage - 1) * PAGE_SIZE + pageData.length} of {filtered.length} records
          </span>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </Card>

      <Modal
        open={!!selectedRecord}
        onClose={() => setSelectedRecord(null)}
        title="Prediction Details"
        footer={<Button variant="primary" onClick={() => setSelectedRecord(null)}>Close</Button>}
      >
        {selectedRecord && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div><strong>Prediction ID:</strong> <span style={{ fontFamily: 'monospace' }}>{selectedRecord.id}</span></div>
            <div><strong>Type:</strong> {selectedRecord.type}</div>
            <div><strong>Outcome:</strong> {selectedRecord.outcome}</div>
            <div><strong>Value:</strong> {selectedRecord.value}{selectedRecord.type === 'Readmission' ? ' (probability)' : ' (days)'}</div>
            <div><strong>Model version:</strong> {selectedRecord.modelVersion}</div>
            <div><strong>Timestamp:</strong> {selectedRecord.timestamp}</div>
            <div style={{ padding: '0.75rem', background: 'var(--warning-light)', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-xs)', color: 'var(--warning)' }}>
              This is a demonstration record and does not represent a real patient encounter.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
