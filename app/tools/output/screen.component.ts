import { MyHistory} from './history';
export interface ScreenComponent {
    data: any;
    data_type: string;
    appid: string;
    history: MyHistory;
}