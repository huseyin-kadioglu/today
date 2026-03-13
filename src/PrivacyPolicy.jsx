import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => { document.dispatchEvent(new Event("app-rendered")); }, []);
  return (
    <div className="screen">
      <div className="terminal privacy-page">
        <div className="privacy-header">
          <Link to="/" className="qz-back">← ana sayfa</Link>
          <h1>Gizlilik Politikası</h1>
          <p className="privacy-updated">Son güncelleme: Mart 2026</p>
        </div>

        <div className="privacy-body">
          <section>
            <h2>1. Veri Sorumlusu</h2>
            <p>
              Bu gizlilik politikası, <strong>bugununtarihi.com.tr</strong> adresinde
              yayınlanan web sitesine aittir. Siteye ilişkin sorularınız için{" "}
              <strong>@caddyoglu</strong> üzerinden iletişime geçebilirsiniz.
            </p>
          </section>

          <section>
            <h2>2. Toplanan Veriler</h2>
            <p>Sitemiz aşağıdaki verileri toplamaktadır:</p>
            <ul>
              <li>
                <strong>Ziyaret verileri:</strong> Sayfa görüntülemeleri, tarayıcı
                türü, coğrafi konum (şehir düzeyinde). Bu veriler Google Analytics
                aracılığıyla anonim olarak toplanır.
              </li>
              <li>
                <strong>Quiz verileri:</strong> Oyun skoru, doğru/yanlış sayısı ve
                girilen takma ad (kullanıcı adı). Bu veriler skor tablosunda
                görüntülenmek üzere Firebase Firestore'da saklanır.
              </li>
              <li>
                <strong>Tarayıcı tercihleri:</strong> Dil seçimi, çerez onayı ve
                quiz kullanıcı adı tarayıcınızdaki localStorage'da tutulur; sunucuya
                iletilmez.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Verilerin Kullanım Amacı</h2>
            <ul>
              <li>Site trafiğini ve kullanıcı davranışını analiz etmek</li>
              <li>Quiz skor tablosunu çalıştırmak</li>
              <li>İlgi alanlarına uygun reklamlar göstermek (onay verilmesi halinde)</li>
            </ul>
          </section>

          <section>
            <h2>4. Çerezler ve Reklam</h2>
            <p>
              Sitemiz Google AdSense aracılığıyla reklam göstermektedir. Çerez
              onayı vermeniz halinde Google, ilgi alanlarınıza göre kişiselleştirilmiş
              reklamlar sunabilir. Bu amaçla Google'ın kendi çerezleri tarayıcınıza
              yerleştirilir.
            </p>
            <p>
              Çerez onayını reddetmeniz veya geri almanız durumunda kişiselleştirilmiş
              reklam gösterilmez; ancak genel reklamlar görünmeye devam edebilir.
            </p>
            <p>
              Google'ın çerez politikası hakkında daha fazla bilgi için:{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/technologies/ads
              </a>
            </p>
          </section>

          <section>
            <h2>5. Üçüncü Taraf Hizmetler</h2>
            <ul>
              <li>
                <strong>Google Analytics:</strong> Site kullanımını ölçmek için.
                Gizlilik politikası:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  policies.google.com/privacy
                </a>
              </li>
              <li>
                <strong>Google AdSense:</strong> Reklam gösterimi için.
              </li>
              <li>
                <strong>Firebase (Google):</strong> Quiz skorlarının saklanması için.
              </li>
            </ul>
          </section>

          <section>
            <h2>6. KVKK Kapsamındaki Haklarınız</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca aşağıdaki
              haklara sahipsiniz:
            </p>
            <ul>
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>Verilerin silinmesini veya yok edilmesini isteme</li>
              <li>İşlemenin kısıtlanmasını talep etme</li>
            </ul>
            <p>
              Bu haklarınızı kullanmak için <strong>@caddyoglu</strong> adresi
              üzerinden tarafımıza ulaşabilirsiniz.
            </p>
          </section>

          <section>
            <h2>7. Çerez Onayını Geri Alma</h2>
            <p>
              Çerez tercihlerinizi sıfırlamak için aşağıdaki butona tıklayabilirsiniz.
              Sayfa yenilendiğinde onay banneri yeniden görünecektir.
            </p>
            <button
              className="cookie-reset-btn"
              onClick={() => {
                localStorage.removeItem("cookie_consent");
                window.location.reload();
              }}
            >
              Çerez tercihimi sıfırla
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
