declare module 'react-modal' {
  export interface ReactModalProps {
    isOpen?: boolean;
    contentLabel?: string;
    overlayClassName?: string;
    className?: string;
    shouldCloseOnOverlayClick?: boolean;
  }
  export default class ReactModal extends React.Component<ReactModalProps> {
    static setAppElement(selector: string | HTMLElement): void
  }
}

interface Function {
  type: any;
}
