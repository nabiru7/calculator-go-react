import "./Description.css";

function Description() {
  return (
    <div className="description">
      <h2>👋 Selamat Datang!</h2>
      <p>Semoga harimu menyenangkan 😃</p>
      <p>
        {new Date().toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      
      {/*  untuk garis horizontal (pembatas) */}
      <hr style={{ margin: "16px 0" }} />
      <h3>Operasi Matematika yang Tersedia:</h3>
      <ul>
        <li>Penjumlahan (<b>+</b>)</li>
        <li>Pengurangan (<b>-</b>)</li>
        <li>Perkalian (<b>x</b>)</li>
        <li>Pembagian (<b>:</b>)</li>
        <li>Persen (<b>%</b>)</li>
        <li>Akar Kuadrat (<b>√</b>)</li>
        <li>Tanda kurung (<b>( )</b>)</li>
        <li>Titik desimal (<b>.</b>)</li>
        <li>Hapus satu karakter (<b>DEL</b>)</li>
        <li>Hapus semua (<b>AC</b>)</li>
      </ul>
    </div>
  );
}

export default Description;