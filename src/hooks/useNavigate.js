import { useNavigate as routerUseNavigate} from 'react-router-dom';


export function useNavigate(...params) {
  return routerUseNavigate(...params);
}