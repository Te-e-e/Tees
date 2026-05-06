import './PricingCard.css';

export default function PricingCard({ planNum, name, subtitle, price, priceSub, features = [], accentClass, isPopular }) {
  const featureList = typeof features === 'string'
    ? features.split(';').filter(Boolean)
    : features;

  return (
    <div className={`pricing-card-atlantic ${accentClass}`}>
      {isPopular && <div className="pricing-popular-badge">POPULAR</div>}
      
      <div className="pricing-plan-header">
        <span className="pricing-plan-num">// PLAN {planNum}</span>
        <h3 className="pricing-title-atlantic">{name}</h3>
        <p className="pricing-subtitle">{subtitle}</p>
      </div>

      <div className="pricing-price-container">
        <div className="pricing-amount-atlantic">{price}</div>
        <p className="pricing-per-asset">{priceSub}</p>
      </div>

      <ul className="pricing-features-atlantic">
        {featureList.map((feature, i) => (
          <li key={i} className="pricing-feature-atlantic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        className="pricing-request-btn"
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      >
        REQUEST &gt;&gt;
      </button>
    </div>
  );
}
