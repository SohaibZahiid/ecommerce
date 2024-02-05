import { useState } from "react";
import ProductModal from "../../components/admin/ProductModal";
import ProductList from "../../components/admin/ProductList";
import { Button } from "@/components/ui/button";

function Products() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-2 ">
        <h2 className="font-bold text-2xl">Products</h2>
        {/* <button className="btn-primary" onClick={() => setOpen(true)}>
          Add new
        </button> */}
        <Button onClick={() => setOpen(true)}>Add new</Button>
      </div>
      <ProductModal open={open} onClose={() => setOpen(false)} />
      <ProductList />
    </div>
  );
}

export default Products;
