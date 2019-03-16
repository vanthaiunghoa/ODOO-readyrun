import * as accountAPIs from '../api/accountAPIs';

export function getAccountList() {
    return new Promise((resolve, reject) => {
        accountAPIs.getAccountList()
            .then(({ success, data }) => {
                const payload = {
                    success,
                    data
                };

                if (success) {
                    payload.data = data.mention_partner_suggestions[0].map(item => (
                        {
                            partnerId: item.id,
                            name: item.name,
                            email: item.email
                        }
                    ));
                }

                resolve(payload);
            })
            .catch(error => {
                reject(error);
            });
    });
}