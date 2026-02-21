import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const Layout = {
    window: {
        width,
        height,
    },
    isSmallDevice: width < 375,
    isWeb: width > 768, // Simple web/desktop detection
    contentWidth: width > 1024 ? 1024 : '100%', // Max width container
    gridColumns: width > 768 ? 2 : 1, // 2 columns for tablet/web
    spacing: {
        xs: 4,
        sm: 10,
        md: 20,
        lg: 30,
        xl: 40,
        xxl: 60,
    },
    borderRadius: {
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 40,
        round: 9999,
    },
};

export default Layout;
