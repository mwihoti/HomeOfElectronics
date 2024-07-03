export const getWishList = () => {
    if (typeof window !== 'undefined') {
        const storedWishlist = localStorage.getItem('wishlist');
        return storedWishlist ? JSON.parse(storedWishlist) : [];

    }
    return [];
}

export const addToWishlist = (product) => {
    const wishlist = getWishList();
    const isInWishlist = wishlist.some(item => item._id === product._id);
    if (!isInWishlist) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
};

export const removeFromWishlist = (productId) => {
    let wishlist = getWishList();
    wishlist = wishlist.filter(item => item._id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
}