import { Share } from 'react-native';

let isOpenedShare = false;

const onShare = async () => {
  if (!isOpenedShare) {
    isOpenedShare = true;
    setTimeout(() => isOpenedShare = false, 1000)

    try {
      const result = await Share.share({
        message:
          'https://vpn.llill.xyz/',
      });
    } catch (error) {
      console.log(error);
    }

  }
};

export default onShare;