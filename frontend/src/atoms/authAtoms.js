import { atom } from 'recoil';

const authScreenAtom =atom({
    key: 'authScreenAtom',
    default: 'login',//by default
});

export default authScreenAtom;