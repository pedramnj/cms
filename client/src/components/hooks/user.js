
export function useUser(id) {
    const q = query(doc(db, "users", id));
    const [user, isLoading] = useDocumentData(q);
    return { user, isLoading };
}