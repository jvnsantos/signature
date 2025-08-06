import { ErrorModel } from "@/shared/models/error.model";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ErrorMessage from "../error-message";

interface ButtonOptionsProps {
    title?: string;
    handleClick?: (e?: any) => void | Promise<void>;
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    variant?: string;
    labelWhileLoading?: string;
}

interface BasicModalProps {
    title: string | JSX.Element;
    content: JSX.Element;
    error?: ErrorModel;
    buttonOptions?: ButtonOptionsProps;
    onClose: () => void;
    size?: "sm" | "lg" | "xl" | undefined;
    dialogClassName?: string
}



const BasicModal = ({ dialogClassName, error, onClose, title, content, size, buttonOptions = {
    type: 'button', className: '"btn btn-primary"'
} }: BasicModalProps) => {
    const [load, setLoad] = useState<boolean>(false);


    const handleClose = () => onClose();

    const handleClick = async (e: any) => {
        try {
            setLoad(true);
            if (buttonOptions.handleClick) {
                await buttonOptions.handleClick(e);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    };

    return (
        <Modal
            size={size}
            show={true}
            onHide={handleClose}
            centered
            dialogClassName={dialogClassName}
            aria-labelledby="exampleModalScrollable4"
            data-bs-keyboard="false"
        >
            <div style={{ width: '100%', maxWidth: '100vw' }}>
                <Modal.Header closeButton>
                    <h6 className="modal-title" id="staticBackdropLabel4">
                        {title}
                    </h6>
                </Modal.Header>
                <Modal.Body>
                    {error && error.visible && <ErrorMessage msg={error.message} />}
                    {content}
                </Modal.Body>

                {buttonOptions?.title && (
                    <Modal.Footer>
                        <Button onClick={(e: any) => handleClick(e)} variant={buttonOptions.variant} type={buttonOptions.type} className={`${load ? 'btn btn-loader' : ''} ${buttonOptions.className} align-items-center`}>
                            {load && <span className="loading p-2"><i className="ri-loader-4-line fs-16"></i></span>}
                            {load ? buttonOptions.labelWhileLoading : buttonOptions.title}
                        </Button>
                    </Modal.Footer>
                )}
            </div>
        </Modal>
    );
};

export default BasicModal;
