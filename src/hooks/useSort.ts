import { useAppSelector } from "./redux";
//@ts-ignore
import { getTranslation } from 'react-native-translation';
import languages from '../constants/languages.json'
import { useCallback, useState } from "react";

export const useSort = () => {
    const { freeVpnList, countries } = useAppSelector(
        ({ vpn }) => vpn
    );
    const [searchValue, setSearchValue] = useState("");

    //Sorting servers
    const getSortedServers = useCallback(() => {
        return [...freeVpnList]
            .sort((a, b) => {
                if (a.averageConnectionTime > b.averageConnectionTime) {
                    return -1;
                } else {
                    return 1
                }
            })
            .sort((a) => {
                if (a.countSuccessConnection > 0) {
                    return 1;
                } else {
                    return -1;
                }
            })
            .sort((a) => {
                if (a.status === "active") {
                    return -1;
                } else {
                    return 1;
                }
            })
    }, [freeVpnList])

    //Filter countries by search value
    const searchedCountryServers = countries
        .filter((country) => {
            return getTranslation(languages.SelectVpn.countries[country.countryCode as keyof Object])
                .toLowerCase()
                .includes(searchValue.toLowerCase())
        })
        .map((country) => {
            return getSortedServers()
                .filter(server => server.country === country.countryCode)
        })
        .filter(countryServers=>countryServers[0])


    return [searchValue, setSearchValue, searchedCountryServers]
}