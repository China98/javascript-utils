export function base64ToBlob(base64Buf: string): Blob {
    const arr = base64Buf.split(',');
    const typeItem = arr[0];
    const mime = typeItem.match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  export function blobToBase64(blob: File | Blob): Promise<{ result: null | string, event: ProgressEvent<FileReader> }> {
    return new Promise<{ result: null | string, event: ProgressEvent<FileReader> }>((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onload = (event) => {
          resolve({
            result: fileReader.result as string,
            event,
          });
        }

        fileReader.onerror = (event) => {
            reject({
                result: null,
                event,
            });
        }
   
        fileReader.readAsDataURL(blob);
    }) 
  }


  export const createElement = (tagName: keyof HTMLElementTagNameMap)  => {
    
  }