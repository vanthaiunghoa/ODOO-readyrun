import * as authAPIs from '../api/authAPIs';

export function login(_domain, _email, _password) {
    return new Promise((resolve, reject) => {
        authAPIs.getDatabaseName(_domain)
            .then(result => {
                if (result.success) {
                    const databaseName = result.data[0];

                    authAPIs.login(_domain, databaseName, _email, _password)
                        .then(({ success, data }) => {
                            const payload = {
                                success,
                                data
                            };

                            if (success) {
                                payload.data = {
                                    sessionId: data.session_id,
                                    id: data.uid,
                                    username: data.username,
                                    name: data.name,
                                    avatarUrl: '',
                                    companyId: data.company_id,
                                    partnerId: data.partner_id,
                                    hasCompanies: data.user_companies,
                                    domain: _domain,
                                    db: databaseName
                                };
                            }

                            resolve(payload);
                        })
                        .catch(error => {
                            reject(error);
                        });
                } else {
                    resolve(result);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
