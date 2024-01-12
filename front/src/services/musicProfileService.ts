import { ImusicProfileType } from "@/interfaces";

export async function uploadFile(userProfileMusic: ImusicProfileType) {
  const formdarta = new FormData();
  formdarta.append("file", userProfileMusic.file[0]);

  return fetch("http://localhost:8080/api/upload", {
    method: "POST",
    body: formdarta,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);  // Exibe a mensagem de sucesso ou erro
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function downloadImageByName() {
  try {
    const response = await fetch("http://localhost:5000/get-all-images");
    if (!response.ok) {
     // console.error("Erro ao buscar imagens");
      return [];
    }

    const data = await response.json();
    const imageNames = data.images || [];

  //  console.log("Nomes das imagens:", imageNames);
    return imageNames;
  } catch (error) {
  // console.error("Erro ao buscar imagens pelo nome:", error);
    return [];
  }
}

export async function downloadImage(imageName: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/get-image/${imageName}`
    );
    if (!response.ok) {
    //  throw new Error("Erro ao buscar imagens");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
   // console.error("Erro ao buscar imagens:", error);
    return "";
  }
}
