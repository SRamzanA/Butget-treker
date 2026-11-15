const STORAGE_KEY = 'budget-app-data';

export const saveState = (state) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
};

export const loadState = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        console.error('Ошибка загрузки:', e);
        return null;
    }
};