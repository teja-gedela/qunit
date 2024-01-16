// components/ProductList.js
import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography, Container, Grid, Link, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Fetch products from Fakestore API
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleReadMore = (description) => {
        // Open a dialog to display the full product description
        setSelectedProduct(description);
    };

    const handleCloseDialog = () => {
        // Close the dialog
        setSelectedProduct(null);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Products
            </Typography>
            <Grid container spacing={3}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div" noWrap>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" noWrap>
                                    {product.description}
                                </Typography>
                                {product.description.length > 420 && (
                                    <Link component="button" variant="body2" onClick={() => handleReadMore(product.description)}>
                                        ...Read More
                                    </Link>
                                )}
                                <Button variant="contained" color="primary" size="small" sx={{ marginTop: 2 }}>
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Read More Dialog */}
            <Dialog open={Boolean(selectedProduct)} onClose={handleCloseDialog}>
                <DialogTitle>Product Details</DialogTitle>
                <DialogContent>
                    <Typography variant="body2">{selectedProduct}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProductList;
