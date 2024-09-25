import axios from "axios";
import { useSuspenseQuery } from '@tanstack/react-query';
import { DEAL_API_URL } from '../../util/Constants';

export function getDealContentListQuery() {
    return useSuspenseQuery({
        queryKey: [`dealContentListKey`],
        queryFn: async () =>
          (await axios.get<TarotImageResponse>(`${import.meta.env.VITE_WAS_URL}/tarot/card/${tarotId}`)).data,
      });
}