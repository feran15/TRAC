// Mock database of POS IDs for testing
const mockPosDatabase = {
  '6500012345': { provider: 'Moniepoint', merchantName: 'Alice Store', status: 'active' },
  '7000012345': { provider: 'Opay', merchantName: 'Bob Mart', status: 'active' },
  '8000012345': { provider: 'PalmPay', merchantName: 'Charlie Shop', status: 'active' },
};

function validatePosId(posId) {
  if (!posId || typeof posId !== 'string') return null;

  const trimmed = posId.trim();

  // POS ID must be numeric
  if (!/^\d+$/.test(trimmed)) return null;

  // Lookup in mock database
  const record = mockPosDatabase[trimmed];

  if (!record) {
    return {
      terminalId: trimmed,
      provider: 'Unknown',
      merchantName: 'Unknown Merchant',
      status: 'inactive',
    };
  }

  return {
    terminalId: trimmed,
    provider: record.provider,
    merchantName: record.merchantName,
    status: record.status,
  };
}

module.exports = validatePosId;
