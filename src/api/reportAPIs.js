import * as apiHelpers from '../helpers/apiHelpers';

export function getGeneralReports(_startTime, _endTime) {
    const path = '/api/dashboard/get_report';
    const method = 'POST';
    const headers = null;
    const body = {
        params: {
            start_time: _startTime,
            end_time: _endTime
        }
    };
    const domain = null;

    return apiHelpers.handleResponse(path, method, headers, body, domain);
}
