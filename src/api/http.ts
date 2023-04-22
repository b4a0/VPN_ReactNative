import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { currentIPDataError } from '../constants';


export const getCurrentIP = createAsyncThunk(
  'vpn/getCurrentIP',
  async (url:string) => {
    if(url === ''){
      console.error("Url API for get IP is empty! Please read the project description again and add url API to file ./types/index.ts")
    }
    return await axios
      .get(url)
      .then(res => {
        if(!res.data.ip && !res.data.query){
          console.error("API does not return json with property 'ip'")
        }
        return res.data
      })
      .catch(() => currentIPDataError);
  },
);