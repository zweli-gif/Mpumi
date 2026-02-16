# Mpumi - Growth Farm Executive Dashboard

A modern, fully free, self-hosted executive dashboard built with vanilla HTML/CSS/JavaScript. Designed to eliminate paid hosting and storage costs by leveraging GitHub Pages.

## 🎯 Features

- **100% Free Hosting** - Deployed on GitHub Pages with zero storage fees
- - **No Backend Required** - Fully client-side rendering
  - - **No External Dependencies** - Only uses free Google Fonts API
    - - **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
      - - **Fast & Lightweight** - Under 50KB, optimized performance
        - - **Tabbed Interface** - Easy navigation across Overview, Pipeline, Health, Finance, and Admin sections
          - - **Modern UI** - Clean, professional dashboard design
            - - **Zero Maintenance Costs** - No monthly/annual fees
             
              - ## 📊 Dashboard Sections
             
              - 1. **Overview** - Company health, business dev pipeline, ventures, client health, financial metrics
                2. 2. **Pipeline** - Sales pipeline breakdown with conversion rates
                   3. 3. **Health** - Overall health scores and critical alerts
                      4. 4. **Finance** - Cash reserves, tax repayment tracking, revenue forecast
                         5. 5. **Admin** - System status and action items
                           
                            6. ## 🚀 Quick Start & Deployment
                           
                            7. ### Option 1: GitHub Pages (Recommended - FREE)
                           
                            8. 1. **Enable GitHub Pages**
                               2.    - Go to Settings → Pages
                                     -    - Source: Deploy from branch
                                          -    - Branch: main
                                               -    - Folder: / (root)
                                                    -    - Save
                                                     
                                                         - 2. **Access Your Dashboard**
                                                           3.    - Your site will be live at: `https://[your-username].github.io/Mpumi`
                                                                 -    - Share this link with your team!
                                                                  
                                                                      - ### Option 2: Vercel (FREE)
                                                                  
                                                                      - 1. **Connect to Vercel**
                                                                        2.    - Visit vercel.com and sign in with GitHub
                                                                              -    - Click "New Project"
                                                                                   -    - Import this repository
                                                                                        -    - Click "Deploy"
                                                                                         
                                                                                             - 2. **Site goes live instantly** at a Vercel URL
                                                                                              
                                                                                               3. ### Option 3: Netlify (FREE)
                                                                                              
                                                                                               4. 1. **Connect to Netlify**
                                                                                                  2.    - Visit netlify.com and sign in with GitHub
                                                                                                        -    - Click "New site from Git"
                                                                                                             -    - Select this repository
                                                                                                                  -    - Click "Deploy site"
                                                                                                                   
                                                                                                                       - 2. **Site goes live instantly** at a Netlify URL
                                                                                                                        
                                                                                                                         3. ## 💰 Cost Comparison
                                                                                                                        
                                                                                                                         4. | Hosting Solution | Storage | Bandwidth | Cost |
                                                                                                                         5. |------------------|---------|-----------|------|
                                                                                                                         6. | **GitHub Pages** | 100 GB | Unlimited | **$0/month** |
                                                                                                                         7. | Paid Hosting | varies | Limited | $5-50/month |
                                                                                                                         8. | Cloud Storage | Charged per GB | Charged | $0.023-0.50/GB |
                                                                                                                         9. | **Vercel Free** | 100 GB | 100 GB/month | **$0/month** |
                                                                                                                         10. | **Netlify Free** | 100 GB | Unlimited | **$0/month** |
                                                                                                                        
                                                                                                                         11. ## 🔧 Customization
                                                                                                                        
                                                                                                                         12. ### Edit Dashboard Data
                                                                                                                        
                                                                                                                         13. Open `index.html` and locate the data sections (look for card content):
                                                                                                                         14. - Metrics are hardcoded but easily editable
                                                                                                                             - - Update the KPI values in the respective cards
                                                                                                                               - - Modify pipeline stages and values as needed
                                                                                                                                
                                                                                                                                 - ### Styling
                                                                                                                                
                                                                                                                                 - The entire design is in the `<style>` section:
                                                                                                                                 - - Color scheme: Modify CSS variables at the top (`:root`)
                                                                                                                                   - - Fonts: Already using free Google Fonts
                                                                                                                                     - - Layout: Responsive grid layout
                                                                                                                                      
                                                                                                                                       - ### Adding New Sections
                                                                                                                                      
                                                                                                                                       - 1. Add a new tab button in the nav-tabs div
                                                                                                                                         2. 2. Create a new content div with unique id
                                                                                                                                            3. 3. Add corresponding show logic in the JavaScript
                                                                                                                                               4. 4. Style with existing CSS classes
                                                                                                                                                 
                                                                                                                                                  5. ## 📝 Data Management
                                                                                                                                                 
                                                                                                                                                  6. **Note:** This is a static dashboard. To add dynamic data:
                                                                                                                                                  7. - Option A: Edit index.html manually before each deployment
                                                                                                                                                     - - Option B: Create a simple JSON data file and load it with fetch()
                                                                                                                                                       - - Option C: Connect to a free backend like Supabase or Firebase
                                                                                                                                                        
                                                                                                                                                         - ## 🔐 Security
                                                                                                                                                        
                                                                                                                                                         - - No backend = No security vulnerabilities
                                                                                                                                                           - - Data stays local to your browser
                                                                                                                                                             - - No external API calls (except Google Fonts)
                                                                                                                                                               - - Host on your own GitHub account
                                                                                                                                                                
                                                                                                                                                                 - ## 📱 Browser Support
                                                                                                                                                                
                                                                                                                                                                 - - Chrome/Chromium (latest)
                                                                                                                                                                   - - Firefox (latest)
                                                                                                                                                                     - - Safari (latest)
                                                                                                                                                                       - - Edge (latest)
                                                                                                                                                                         - - Mobile browsers (iOS Safari, Chrome Mobile)
                                                                                                                                                                          
                                                                                                                                                                           - ## 🎨 Design Credits
                                                                                                                                                                          
                                                                                                                                                                           - - **Color Scheme:** Inspired by modern enterprise dashboards
                                                                                                                                                                             - - **Fonts:** Inter (body), Playfair Display (headings) via Google Fonts
                                                                                                                                                                               - - **Icons:** Unicode emojis
                                                                                                                                                                                 - - **Framework:** Vanilla HTML/CSS/JavaScript (no dependencies)
                                                                                                                                                                                  
                                                                                                                                                                                   - ## 📋 Migration from Paid Hosting
                                                                                                                                                                                  
                                                                                                                                                                                   - If you're coming from a paid hosting provider:
                                                                                                                                                                                  
                                                                                                                                                                                   - 1. **Download this repo** as a ZIP
                                                                                                                                                                                     2. 2. **Update the data** in index.html to match your dashboard
                                                                                                                                                                                        3. 3. **Push to GitHub** (or upload to Vercel/Netlify)
                                                                                                                                                                                           4. 4. **Enable GitHub Pages** (or connect to Vercel/Netlify)
                                                                                                                                                                                              5. 5. **Access your free dashboard** - that's it!
                                                                                                                                                                                                
                                                                                                                                                                                                 6. ## 🆘 Troubleshooting
                                                                                                                                                                                                
                                                                                                                                                                                                 7. **Dashboard not showing?**
                                                                                                                                                                                                 8. - Check that index.html is in the root directory
                                                                                                                                                                                                    - - Ensure GitHub Pages is enabled in Settings
                                                                                                                                                                                                      - - Wait 2-3 minutes for GitHub Pages to build
                                                                                                                                                                                                        - - Check the Actions tab for deployment status
                                                                                                                                                                                                         
                                                                                                                                                                                                          - **Styling looks wrong?**
                                                                                                                                                                                                          - - Clear browser cache (Ctrl+Shift+Del or Cmd+Shift+Del)
                                                                                                                                                                                                            - - Try a different browser
                                                                                                                                                                                                              - - Check browser console for errors (F12)
                                                                                                                                                                                                               
                                                                                                                                                                                                                - **Want to add a backend?**
                                                                                                                                                                                                                - - Try Supabase, Firebase, or Railway (all have free tiers)
                                                                                                                                                                                                                  - - Update fetch() calls in JavaScript to point to your API
                                                                                                                                                                                                                   
                                                                                                                                                                                                                    - ## 📚 Future Enhancements
                                                                                                                                                                                                                   
                                                                                                                                                                                                                    - - [ ] LocalStorage for persistent data
                                                                                                                                                                                                                      - [ ] - [ ] JSON import/export functionality
                                                                                                                                                                                                                      - [ ] - [ ] Dark mode toggle
                                                                                                                                                                                                                      - [ ] - [ ] PDF export feature
                                                                                                                                                                                                                      - [ ] - [ ] Real-time data integration
                                                                                                                                                                                                                      - [ ] - [ ] User authentication (optional)
                                                                                                                                                                                                                     
                                                                                                                                                                                                                      - [ ] ## 📄 License
                                                                                                                                                                                                                     
                                                                                                                                                                                                                      - [ ] Open source. Use freely for your organization.
                                                                                                                                                                                                                     
                                                                                                                                                                                                                      - [ ] ## 🤝 Support
                                                                                                                                                                                                                     
                                                                                                                                                                                                                      - [ ] Having issues?
                                                                                                                                                                                                                      - [ ] - Check GitHub Issues
                                                                                                                                                                                                                      - [ ] - Review the code comments in index.html
                                                                                                                                                                                                                      - [ ] - Consult the Troubleshooting section above
                                                                                                                                                                                                                     
                                                                                                                                                                                                                      - [ ] ---
                                                                                                                                                                                                                     
                                                                                                                                                                                                                      - [ ] **Remember:** This dashboard costs $0/month to host. If you were previously paying for storage/hosting, you're now saving hundreds of dollars annually! 💰
                                                                                                                                                                                                                     
                                                                                                                                                                                                                      - [ ] Built with ❤️ for Growth Farm. Powered by free technology.
