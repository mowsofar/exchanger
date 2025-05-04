import { Headline3 } from '@salutejs/plasma-web';
import React from 'react';
import { StyledContent, StyledDescription, StyledRoot, StyledSubtitle, StyledSwitch } from './SettingsPage.styled';
import { getTechMode, setTechMode } from '../../api/handlers';
import { useNotification } from '../../hooks/useNotification';

export const SettingsPage: React.FC = () => {
    const [technicalMode, setTechnicalMode] = React.useState(false);

    const showNotification = useNotification();

    const getStatus = async () => {
        try {
            const techMode = await getTechMode();
            setTechnicalMode(techMode.maintenance);
        } catch {}
    };

    React.useEffect(() => {
        getStatus();
    }, []);

    const toggleActivity = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setTechnicalMode(event.target.checked);
            await setTechMode(event.target.checked);
            showNotification('Статус успешно изменён', 'success');
        } catch {
            showNotification('Ошибка изменения статуса', 'warning');
        }
    };
    return (
        <>
            <head>
                <title>Настройки</title>
            </head>

            <StyledRoot>
                <StyledContent>
                    <Headline3>Настройки системы</Headline3>
                    <StyledSubtitle>Технические работы</StyledSubtitle>
                    <StyledDescription>После включения ползунка новые заявки не будут приниматься.</StyledDescription>
                    <StyledSwitch checked={technicalMode} onChange={toggleActivity} label="Технические работы" />
                </StyledContent>
            </StyledRoot>
        </>
    );
};
