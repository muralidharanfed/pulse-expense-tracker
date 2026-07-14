import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function ConfirmDialog({ open, title, description, onConfirm, onCancel }) {
  return (
    <Modal open={open} onClose={onCancel} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-secondary mb-6">{description}</p>
      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" className="flex-1" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
