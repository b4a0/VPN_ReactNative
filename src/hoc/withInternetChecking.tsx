import React from 'react'
import { useAppSelector } from '../hooks/redux';
import NetworkUnavailableAlert from '../components/ui/NetworkUnavailableAlert';

const withInternetChecking = (Component: React.FC<any>) => {

    return ({ ...props }) => {
        const { isNetworkReachable } = useAppSelector(({ vpn }) => vpn);

        return isNetworkReachable
            ? <Component {...props} />
            : <NetworkUnavailableAlert />
        }
};

export default withInternetChecking;