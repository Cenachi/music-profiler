import { Inter } from "next/font/google";
import { SubmitBtn } from "@/components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImusicProfileType } from "@/interfaces";
import {
  LinearProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { downloadImage, downloadImageByName, uploadFile } from "@/services";
import { useEffect, useState } from "react";

export default function Home() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);
      setImageUrls([]);      
      
      const imageNames = await downloadImageByName();
      
      if (imageNames === null || imageNames.length === 0) {
        setIsLoading(true);
        return;
      }

      const urls = await Promise.all(imageNames.map(downloadImage));
      
      if (urls === null || urls.length === 0) {
        setIsLoading(true);
        return;
      }

      setImageUrls(urls);
      setIsLoading(false);
    }

    fetchImages();
  }, []);

  const schema = yup.object().shape({
    file: yup
      .mixed<FileList>()
      .required("Importar um arquivo é obrigatório")
      .test(
        "is-file-selected",
        "Importar um arquivo é obrigatório",
        (value) => {
          return value && value.length > 0;
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleSubmitForm = handleSubmit(async (file: ImusicProfileType) => {
    console.log(file);
    await uploadFile(file);
  });

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          className="flex flex-col w-full items-center justify-center mt gap-2 p-8 mx-w-md mt-16"
          encType="multipart/form-data"
          onSubmit={handleSubmitForm}
        >
          <h1 className="text-center capitalize text-3xl">Music Profile</h1>
          <label className="flex flex-col">
            <span className="ml-1">Submeta seu arquivo</span>
            <input
              className="p-2 rounded-md border-gray-400 border-solid border-2 enabled:hover:border-yellow-300 focus:border-yellow-400 outline-none"
              type="file"
              multiple
              accept=".csv"
              {...register("file")}
            />
            {errors.file && (
              <p className="text-red-600 text-sm font-mono">
                {errors.file.message}
              </p>
            )}
          </label>
          <SubmitBtn>Enviar</SubmitBtn>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <TableContainer
          className="flex flex-col w-3/5 items-center justify-center mt-16"
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: "auto" }}
        >
          <Table className="mx-auto">
            <TableHead>
              <TableRow>
                <TableCell width={550} align="center">
                  Imagens
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {imageUrls.map((url) => (
                <TableRow key={url} >
                  <TableCell width={"100%"} align="center" className="flex items-center justify-center">
                    <img src={url} alt="img" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={3}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
