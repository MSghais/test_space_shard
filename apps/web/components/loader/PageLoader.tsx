import React from 'react';
import { Box, CircularProgress, Icon, Flex } from '@chakra-ui/react';
import GearLoader from './GearLoader';

const PageLoader: React.FC = () => {
    return (
        <Box
        display={"grid"}
        alignItems="center" 
        justifyItems="center"
        justifyContent={"center"}
        >
            <GearLoader></GearLoader>
        </Box>

    );
};

export default PageLoader;
