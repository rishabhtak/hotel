import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';

// const hostImage = process.env.REACT_APP_HOST_IMAGE;

const imageURL = "http://localhost:5000/public/images/rooms/";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const UploadImage = ({ handleImageUpload, currentRoomDetail }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);


    useEffect(() => {
        if (currentRoomDetail) {
            let images = [];
            images = currentRoomDetail.images.map((image) => {
                return {
                    key: image,
                    url: imageURL + image
                }
            })
            setFileList(images);
        }
    }, [currentRoomDetail])



    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
        handleImageUpload(newFileList)
    }
    const props = {
        beforeUpload: (file) => {
            const isImage = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/webp';
            if (!isImage) {
                message.error(`${file.name} is not a jpg, jpeg, webp, png format image`);
            }
            return isImage || Upload.LIST_IGNORE;
        },
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Upload
                {...props}
                customRequest={({ onSuccess }) =>
                    onSuccess("success")}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept='image/*'
            >
                {fileList.length >= 4 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
export default UploadImage;