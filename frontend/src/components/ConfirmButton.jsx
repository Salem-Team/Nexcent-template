export default function ConfirmButton({ message = 'Are you sure?', onConfirm, children }) {
  return (
    <button
      onClick={() => {
        if (window.confirm(message)) onConfirm();
      }}
    >
      {children}
    </button>
  );
}
