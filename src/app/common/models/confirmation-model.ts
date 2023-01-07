export class ConfirmationModel {
  title?: string;
  fullTitle?: string;
  description?: string;
  fullDescription?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
