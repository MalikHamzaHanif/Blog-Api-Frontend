import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import conf from '../conf/conf';
import Select from '../components/Select';

function CreateBlog() {
    const { handleSubmit, register, formState: { errors }, watch, setValue } = useForm({
        defaultValues: {
            category: "other"
        }
    });

    const [displayImage, setDisplayImage] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const options = ["tech", "fashion", "travel", "health", "education", "other"];
    const [loading, setLoading] = useState(false);

    async function createBlog(data) {
        setLoading(true);
        setError("");
        setSuccessMessage("");
        const token = localStorage.getItem("x-auth-token");
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("content", data.content);
        formData.append("category", data.category);
        formData.append("image", data.image[0]);

        try {
            const res = await fetch(`${conf.dataUrl}`, {
                method: "POST",
                headers: {
                    authorization: token
                },
                body: formData
            });
            const resData = await res.json();
            if (resData.sucess === false) {
                throw new Error(resData.data.msg);
            }

            setSuccessMessage(resData.msg);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setTimeout(() => {
                setSuccessMessage("");
                setError("");
            }, 4000);
            setValue("title", "");
            setValue("content", "");
            setValue("category", "other");
            setDisplayImage(null)
        }
    }

    const watchImage = watch("image");
    useEffect(() => {
        if (watchImage && watchImage.length > 0) {
            const image = watchImage[0];
            const imageurl = URL.createObjectURL(image);
            setDisplayImage(imageurl);
            return () => URL.revokeObjectURL(imageurl);
        }
    }, [watchImage]);

    if (loading) {
        return (<h1 className="text-center text-xl font-semibold mt-10">Creating blog, please wait...</h1>);
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="mb-6">
                {error && <p className="text-red-500 font-medium mb-2">{error}</p>}
                {successMessage && <p className="text-green-600 font-medium mb-2">{successMessage}</p>}
            </div>

            <form
                onSubmit={handleSubmit(createBlog)}
                className="bg-white shadow-md rounded-lg p-6 space-y-6"
            >
                <div>
                    <Input
                        placeholder="Type title here"
                        label="Title"
                        {...register("title", { required: 'Title cannot be empty' })}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                    <Input
                        placeholder="Type content here"
                        label="Content"
                        {...register("content", { required: 'Content cannot be empty' })}
                    />
                    {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
                </div>

                {displayImage && (
                    <div className="mb-4">
                        <img src={displayImage} alt="Preview" className="w-full rounded-md shadow" />
                    </div>
                )}

                <div>
                    <Input
                        label="Image"
                        type="file"
                        accept="image/*"
                        {...register("image", { required: 'Please select an image file' })}
                    />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                </div>

                <div>
                    <Select
                        label="Select category"
                        options={options}
                        {...register("category", { required: "Category is required" })}
                    />
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                <button
                    type='submit'
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Create Blog
                </button>
            </form>
        </div>
    );
}

export default CreateBlog;
