import { Headline3 } from '@salutejs/plasma-web';
import React from 'react';
import { Button } from '../Button/Button.styled';
import { Content, StyledImg, StyledModal, StyledTextField } from './PaymentSystemModals.styled';
import { IconPlus } from '@salutejs/plasma-icons';

interface AddPaymentSystemModalProps {
    opened: boolean;
    onClose: () => void;
    createPaymentSystem: (name: string, file: File) => void;
}

export const AddPaymentSystemModal: React.FC<AddPaymentSystemModalProps> = ({
    opened,
    onClose,
    createPaymentSystem,
}) => {
    const [name, setName] = React.useState('');
    const [image, setImage] = React.useState<File | null>(null);
    const [preview, setPreview] = React.useState('');

    const onCloseModal = () => {
        setName('');
        setImage(null);
        setPreview('');
        onClose();
    };

    const handleSubmit = () => {
        if (image) {
            createPaymentSystem(name, image);
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
            <Headline3>Добавить платёжную систему</Headline3>
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
                    accept="image/jpg, image/png, image/jpeg, image/webp"
                    hidden
                />

                {preview && <StyledImg src={preview} alt="" />}

                <Button text="Добавить" stretch onClick={handleSubmit} disabled={!name || !image} />
            </Content>
        </StyledModal>
    );
};
