function Modal({ aberto, titulo, children, onClose }) {
    if (!aberto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{titulo}</h2>

                    <button
                        className="modal-close"
                        onClick={onClose}
                    >
                        ✖
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}

export default Modal;