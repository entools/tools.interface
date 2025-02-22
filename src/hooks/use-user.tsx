import { useAppSelector } from './index';
import { userSelector } from '../store/index';

export default function useUser() {
  return useAppSelector(userSelector);
}
