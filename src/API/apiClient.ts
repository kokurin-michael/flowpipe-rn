import axios from 'axios';
import Config from 'react-native-config';

const apiClient = axios.create({baseURL: Config.BASE_URL});
