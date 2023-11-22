import { Card, Row, Col, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CompanyTable } from '../components/CompanyTable';
import { ProductTable } from '../components/ProductTable';
import { IncorporationCountryChart, ProductGroupByCompanyChart } from '../components/ChartComponents';


const HomePage = () => {
  const [companyCount, setCompanyCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [companies, setCompanies] = useState([]);
  const [latestCompanies, setLatestCompanies] = useState([]);
  const [highestAmountProduct, setHighestAmountProduct] = useState([]);
  const [countByCountry, setCountByCountry] = useState([]);
  const [countByCompany, setCountByCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchCompanyCount = async () => {
      const res = await axios.get('/api/company/count', {
        headers: {
          'x-auth-token': token,
        },
      });
      setCompanyCount(res.data.companyCount);
    };

    const fetchLatestCompanies = async () => {
      try {
        const res = await axios.get('/api/company', {
          headers: {
            'x-auth-token': token,
          },
        });

        if (res.data && res.data.length > 0) {
          setCompanies(res.data);
          const sortedCompanies = [...res.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const latestCompanies = sortedCompanies.slice(0, 3);
          setLatestCompanies(latestCompanies);
        } else {
          console.warn('No company data received from the API.');
        }
      } catch (error) {
        console.error('Error fetching latest companies:', error.message);
        setLatestCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchHighestAmounthProducts = async () => {
      try {
        const res = await axios.get('/api/product', {
          headers: {
            'x-auth-token': token,
          },
        });

        if (res.data && res.data.length > 0) {
          const sortedProducts = [...res.data].sort((a, b) => b.amount - a.amount);
          setHighestAmountProduct(sortedProducts.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching highest amount products:', error.message);
        setHighestAmountProduct([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductCount = async () => {
      try {
        const res = await axios.get('/api/product/count', {
          headers: {
            'x-auth-token': token,
          },
        });
        setProductCount(res.data.productCount);
      }
      catch (error) {
        console.error('Error fetching product count:', error.message);
        setProductCount([]);
      } finally {
        setLoading(false);
      }
    }

    const fetchCountByCountry = async () => {
      try {
        const res = await axios.get('/api/company/count-group-by-country', {
          headers: {
            'x-auth-token': token,
          },
        });
        setCountByCountry(res.data);
      }
      catch (error) {
        console.error('Error fetching count by country:', error.message);
        setCountByCountry([]);
      } finally {
        setLoading(false);
      }
    }

    const fetchCountByCompany = async () => {
      try {
        const res = await axios.get('/api/product/count-group-by-company', {
          headers: {
            'x-auth-token': token,
          },
        });
        setCountByCompany(res.data);
      }
      catch (error) {
        console.error('Error fetching count by company:', error.message);
        setCountByCompany([]);
      } finally {
        setLoading(false);
      }
    }



    fetchCompanyCount();
    fetchLatestCompanies();
    fetchHighestAmounthProducts();
    fetchProductCount();
    fetchCountByCountry();
    fetchCountByCompany();
  }, [token]);

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={32}>
        <Col span={12}>
          <Card title="Company Overview" style={{ marginBottom: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic title="Numbers of companies in the system" value={companyCount} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Product Overview" style={{ marginBottom: '20px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic title="Numbers of products in the system" value={productCount} />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Latest Added Companies" style={{ marginBottom: '20px' }}>
            <CompanyTable companies={latestCompanies} loading={loading} pagination={false} />
          </Card>
          <Col span={24}>
            <IncorporationCountryChart data={countByCountry} />
          </Col>
        </Col>

        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Highest Amount Products" style={{ marginBottom: '20px' }}>
                <ProductTable products={highestAmountProduct} loading={loading} pagination={false} />
              </Card>
            </Col>
            <Col span={24}>
              <ProductGroupByCompanyChart data={countByCompany} />
            </Col>

          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
