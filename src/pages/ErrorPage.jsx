import { Error } from "@mui/icons-material";

function ErrorPage() {
  return (
    <div className="h-screen w-screen flex items-center bg-orange-50 justify-center">
      <div className="font-teachers flex items-center gap-2 text-3xl font-medium">
        {" "}
        <Error
          sx={{
            fontSize: 35,
          }}
        />{" "}
        No Page Found!
      </div>
    </div>
  );
}

export default ErrorPage;
