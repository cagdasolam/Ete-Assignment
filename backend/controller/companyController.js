const Company = require('../model/companyModel');

const createCompany = async (req, res) => {
  try {
    const { name, legalNumber, incorporationCountry, website } = req.body;
    const company = new Company({
      name,
      legalNumber,
      incorporationCountry,
      website
    });

    const savedCompany = await company.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyCount = async (req, res) => {
  try {
    const count = await Company.countDocuments();
    res.status(200).json({ companyCount: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCompanyCountGroupByCountry = async (req, res) => {
  try {
    const count = await Company.aggregate([
      {
        $group: {
          _id: '$incorporationCountry',
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(count.sort((a, b) => b.count - a.count));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
  getCompanyCount,
  getCompanyCountGroupByCountry
};
