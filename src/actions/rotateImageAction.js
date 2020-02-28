import ImageRotate from 'react-native-image-rotate';
import { ImageStore } from 'react-native';


export function rotateImageAction(image, rotate) {
    return (dispatch) => new Promise((resolve, reject) => {
        dispatch({
            error: null,
            rotateImageData: null,
            type: 'ROTATE_IMAGE'
        });

        ImageRotate.rotateImage(
            image,
            rotate,
            (uri) => {
                ImageStore.getBase64ForTag(uri, (base64Data) => {
                    const imageData = `data:image/png;base64,${base64Data}`;
                    dispatch({
                        error: null,
                        rotateImageData: { image: imageData },
                        type: 'ROTATE_IMAGE_SUCCESS'
                    });
                    resolve({ image: imageData });
                }, (error) => {
                    dispatch({
                        error,
                        rotateImageData: null,
                        type: 'ROTATE_IMAGE_ERROR'
                    });
                    reject(error);
                });
            },
            (error) => {
                dispatch({
                    error,
                    rotateImageData: null,
                    type: 'ROTATE_IMAGE_ERROR'
                });
                reject(error);
            }
        );
    });
}
