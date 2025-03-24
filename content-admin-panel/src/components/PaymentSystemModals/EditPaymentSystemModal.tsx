import { Headline3 } from '@salutejs/plasma-web';
import React from 'react';
import { Button } from '../Button/Button.styled';
import { Content, StyledImg, StyledModal, StyledTextField } from './PaymentSystemModals.styled';
import { IconPlus } from '@salutejs/plasma-icons';
import { PaymentSystem } from '../../api/types/common';

interface EditPaymentSystemModalProps {
    opened: boolean;
    paymentSystem: PaymentSystem;
    onClose: () => void;
    editPaymentSystem: (id: number, name: string, file?: File) => void;
}

export const EditPaymentSystemModal: React.FC<EditPaymentSystemModalProps> = ({
    opened,
    paymentSystem,
    onClose,
    editPaymentSystem,
}) => {
    const [name, setName] = React.useState(paymentSystem.name);
    const [image, setImage] = React.useState<File | null>(null);
    const [preview, setPreview] = React.useState(paymentSystem.imagePath);

    const onCloseModal = () => {
        setName('');
        setImage(null);
        setPreview('');
        onClose();
    };

    const handleSubmit = () => {
        if (image && (preview !== paymentSystem.imagePath || name !== paymentSystem.name)) {
            editPaymentSystem(paymentSystem.id, name, image);
        }

        if (!image && name !== paymentSystem.name) {
            editPaymentSystem(paymentSystem.id, name);
        }

        onCloseModal();
    };

    const handleClickButtonUpload = () => {
        const input = document.querySelector('.upload_input');
        const clickEvent = new MouseEvent('click');
        input?.dispatchEvent(clickEvent);
    };

    return (
        <StyledModal opened={opened} onClose={onCloseModal}>
            <Headline3>Редактировать платёжную систему</Headline3>
            <Content>
                <StyledTextField
                    label="Название"
                    placeholder="Введите название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Button
                    className=""
                    text="Выберите иконку"
                    view="secondary"
                    contentLeft={<IconPlus />}
                    onClick={() => handleClickButtonUpload()}
                    style={{ display: 'flex', alignSelf: 'center' }}
                />

                <input
                    className="upload_input"
                    title="Выберите иконку"
                    type="file"
                    onChange={(e) => {
                        if (!e.target.files) return;
                        setImage(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                    }}
                    accept="image/jpg, image/png, image/jpeg, image/webp, image/svg"
                    hidden
                />

                {preview && <StyledImg src={preview} alt="" />}

                <Button text="Изменить" stretch onClick={handleSubmit} />
            </Content>
        </StyledModal>
    );
};
