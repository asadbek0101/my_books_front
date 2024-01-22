import Button from "../ui/Button";

export default function HeaderLogoutButton() {
  return (
    <Button
      onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
    >
      Logout
    </Button>
  );
}
