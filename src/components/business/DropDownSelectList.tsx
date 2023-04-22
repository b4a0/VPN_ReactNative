import React, { useState } from 'react';
import DropDownPicker from "react-native-dropdown-picker";
import ConnectionItem from './ConnectionItem';
import { Image, View } from 'react-native';
//@ts-ignore
import { getTranslation } from 'react-native-translation';
import { DropDownSelectListProps } from '../../types';
import { countryFlags } from '../../constants/countryFlags';
import languages from '../../constants/languages.json'
// Список с выбором стран
const DropDownSelectList: React.FC<DropDownSelectListProps> = ({ country, servers }) => {
    const label = getTranslation(languages.SelectVpn.countries[country.countryCode as keyof Object]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(() => servers.map((server) => {
        return {
            label: `${label} ${server.title}`,
            value: server.objectName
        }
    }));
    
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}>

            <DropDownPicker

                placeholder={`${label} (${servers.length})`}
                listMode="MODAL"
                renderListItem={(item) => <ConnectionItem item={servers.filter(s => item.value === s.objectName)[0]} />}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                searchable={true}

                style={{
                    borderWidth: 0,
                }}
                containerStyle={{
                    margin: 10,
                    width: '90%',
                }}
                placeholderStyle={{
                    fontFamily: 'Montserrat-Regular',
                    fontSize: 20,
                    marginLeft: 10,
                }}
                arrowIconContainerStyle={{
                    borderColor: 'black',
                    borderWidth: 0.5,
                }}

                showArrowIcon={true}
                ArrowDownIconComponent={() => <Image style={{ width: 48, height: 36 }} source={countryFlags[country.countryCode]} />}
            />
        </View>


    )


};

export default DropDownSelectList;