//app\editProduct\[id]\page.js
import EditProductForm from "@/components/EditProductForm";
 
const getProductById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            cache: "no-store",
        });
 
        if (!res.ok) {
            throw new Error("Failed to fetch product");
        }
 
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
 
export default async function EditProduct({ params }) {
    const { id } = params;
    const { product } = await getProductById(id);
    const { name, image, price,category } = product;
 
    return <EditProductForm id={id} name={name} image={image} price={price} category={category} />;
}