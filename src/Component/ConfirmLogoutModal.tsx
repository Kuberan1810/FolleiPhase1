import { createPortal } from 'react-dom';

interface ConfirmLogoutModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmLogoutModal = ({ onConfirm, onCancel }: ConfirmLogoutModalProps) => {
    return createPortal(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
            <div className="w-[400px] p-6 shadow-xl BoxStyle">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">
                    Are you sure?
                </h3>

                <p className="text-sm text-[#626262] mb-8   ">
                    Do you really want to log out?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-[#F7F5F9] text-[#333333] hover:bg-[#EFEAF3] cursor-pointer border border-[#E2E8F080] hover:border-[#E2E8F0]  "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ConfirmLogoutModal;
