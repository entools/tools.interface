import { useAppSelector } from './index.ts';
import { userSelector } from '../store/index.ts';

export default function useUser() {
  return useAppSelector(userSelector);
}
