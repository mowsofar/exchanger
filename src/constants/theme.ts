import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
    token: { colorPrimary: '#2A72F8' },
    components: {
        Menu: {
            colorItemBgHover: "#212436",
            colorItemBgSelected: "#212436",
            colorItemTextSelected: "#212436",
        },
        Button: {
            colorBgContainer: '#212436',
            colorBgSolid: '#212436',
            colorBorder: '#212436',
            colorBgTextActive: 'white',
            colorText: 'white',
            fontWeight: '600',
        },
        Table: {
            borderRadius: 12,
            colorBgContainer: "#4643DF",
            borderColor: '#212436',
            colorTextHeading: 'white',
            colorText: 'white',
        }
    },
};