import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import handleLogin from '../../services/axiosHandleLogin';

export const useLogin = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      handleLogin(token).then((res) => {
        if (res.status === 200) {
          setLogin(true);
        }
      });
    }
  }, []);

  return { login };
}