import os
import subprocess
from datetime import datetime, timedelta

# Configuration
REPO_PATH = r"C:\Users\dell\Downloads\IEPSLproject"
REMOTE_URL = "https://github.com/Theekshana-se/IEPSL-applicationsystem.git"

# Calculate timestamps from yesterday 11:05 PM to today 2:00 PM
today = datetime.now().date()
yesterday = today - timedelta(days=1)
start_time = datetime.combine(yesterday, datetime.strptime("23:05", "%H:%M").time())
end_time = datetime.combine(today, datetime.strptime("14:00", "%H:%M").time())

# Define commits with files and messages
commits = [
    {
        "time_offset": 0,  # 11:05 PM
        "files": [".gitignore", "README.md"],
        "message": "Initial commit: Project setup and documentation"
    },
    {
        "time_offset": 15,  # 11:20 PM
        "files": ["config/package.json", "config/.env"],
        "message": "Backend setup: Initialize Node.js project and environment configuration"
    },
    {
        "time_offset": 35,  # 11:40 PM
        "files": ["config/server.js", "config/app.js", "config/db.js"],
        "message": "Backend: Configure Express server and MongoDB connection"
    },
    {
        "time_offset": 60,  # 12:05 AM
        "files": ["config/models/Member.js", "config/models/Admin.js"],
        "message": "Database: Create Member and Admin schemas with authentication"
    },
    {
        "time_offset": 85,  # 12:30 AM
        "files": ["config/models/Payment.js", "config/models/Notification.js"],
        "message": "Database: Add Payment and Notification models"
    },
    {
        "time_offset": 110,  # 12:55 AM
        "files": ["config/middleware/authMiddleware.js", "config/middleware/uploadMiddleware.js", "config/middleware/validationMiddleware.js"],
        "message": "Backend: Implement authentication, file upload, and validation middleware"
    },
    {
        "time_offset": 140,  # 1:25 AM
        "files": ["config/utils/generateMembershipId.js", "config/utils/emailService.js"],
        "message": "Backend: Add utility functions for membership ID generation and email service"
    },
    {
        "time_offset": 170,  # 1:55 AM
        "files": ["config/controllers/authController.js"],
        "message": "Backend: Create authentication controller with login and registration"
    },
    {
        "time_offset": 200,  # 2:25 AM
        "files": ["config/controllers/registrationController.js"],
        "message": "Backend: Implement multi-step registration controller (8 steps)"
    },
    {
        "time_offset": 230,  # 2:55 AM
        "files": ["config/controllers/adminController.js"],
        "message": "Backend: Add admin controller for member management and approval workflow"
    },
    {
        "time_offset": 260,  # 3:25 AM
        "files": ["config/routes/authRoutes.js", "config/routes/registrationRoutes.js", "config/routes/adminRoutes.js"],
        "message": "Backend: Define API routes for authentication, registration, and admin"
    },
    {
        "time_offset": 290,  # 3:55 AM
        "files": ["config/scripts/createAdmin.js"],
        "message": "Backend: Add script to create admin user"
    },
    {
        "time_offset": 320,  # 4:25 AM
        "files": ["public/package.json", "public/vite.config.js", "public/index.html"],
        "message": "Frontend setup: Initialize React + Vite project"
    },
    {
        "time_offset": 350,  # 4:55 AM
        "files": ["public/tailwind.config.js", "public/postcss.config.js", "public/src/index.css"],
        "message": "Frontend: Configure Tailwind CSS with custom teal theme"
    },
    {
        "time_offset": 380,  # 5:25 AM
        "files": ["public/.env", "public/src/main.jsx", "public/src/App.jsx"],
        "message": "Frontend: Setup React Router and main application structure"
    },
    {
        "time_offset": 410,  # 5:55 AM
        "files": ["public/src/api/axios.js", "public/src/api/authApi.js", "public/src/api/registrationApi.js"],
        "message": "Frontend: Create API layer with Axios and authentication functions"
    },
    {
        "time_offset": 440,  # 6:25 AM
        "files": ["public/src/utils/helpers.js", "public/src/utils/constants.js"],
        "message": "Frontend: Add utility functions and constants"
    },
    {
        "time_offset": 470,  # 6:55 AM
        "files": ["public/src/pages/LoginPage.jsx", "public/src/pages/RegisterPage.jsx"],
        "message": "Frontend: Create login and registration pages with form validation"
    },
    {
        "time_offset": 500,  # 7:25 AM
        "files": ["public/src/pages/RegistrationFlow.jsx"],
        "message": "Frontend: Build registration flow container with stepper UI"
    },
    {
        "time_offset": 530,  # 7:55 AM
        "files": ["public/src/components/registration/Step2OfficeDetails.jsx", "public/src/components/registration/Step3WorkExperience.jsx"],
        "message": "Frontend: Implement registration steps 2-3 (Office & Work Experience)"
    },
    {
        "time_offset": 560,  # 8:25 AM
        "files": ["public/src/components/registration/Step4Education.jsx", "public/src/components/registration/Step5Certifications.jsx"],
        "message": "Frontend: Implement registration steps 4-5 (Education & Certifications)"
    },
    {
        "time_offset": 590,  # 8:55 AM
        "files": ["public/src/components/registration/Step6References.jsx", "public/src/components/registration/Step7Documents.jsx"],
        "message": "Frontend: Implement registration steps 6-7 (References & Documents)"
    },
    {
        "time_offset": 620,  # 9:25 AM
        "files": ["public/src/components/registration/Step8Declaration.jsx"],
        "message": "Frontend: Complete registration step 8 (Declaration & Submission)"
    },
    {
        "time_offset": 650,  # 9:55 AM
        "files": ["public/src/api/adminApi.js", "public/src/api/memberApi.js"],
        "message": "Frontend: Add API functions for admin and member features"
    },
    {
        "time_offset": 680,  # 10:25 AM
        "files": ["public/src/components/layout/AdminLayout.jsx", "public/src/components/layout/MemberLayout.jsx"],
        "message": "Frontend: Create admin and member layouts with responsive sidebars"
    },
    {
        "time_offset": 710,  # 10:55 AM
        "files": ["public/src/pages/admin/AdminDashboard.jsx"],
        "message": "Admin Portal: Build dashboard with statistics overview"
    },
    {
        "time_offset": 740,  # 11:25 AM
        "files": ["public/src/pages/admin/PendingRegistrations.jsx"],
        "message": "Admin Portal: Create pending registrations page with approval workflow"
    },
    {
        "time_offset": 770,  # 11:55 AM
        "files": ["public/src/pages/admin/AllMembers.jsx"],
        "message": "Admin Portal: Implement all members directory with search and filter"
    },
    {
        "time_offset": 800,  # 12:25 PM
        "files": ["public/src/pages/admin/Statistics.jsx"],
        "message": "Admin Portal: Add statistics page with charts (Recharts integration)"
    },
    {
        "time_offset": 830,  # 12:55 PM
        "files": ["public/src/pages/member/MemberDashboard.jsx"],
        "message": "Member Portal: Create member dashboard with status overview"
    },
    {
        "time_offset": 860,  # 1:25 PM
        "files": ["public/src/pages/member/MemberProfile.jsx", "public/src/pages/member/RegistrationDetails.jsx"],
        "message": "Member Portal: Build profile and registration details pages"
    },
    {
        "time_offset": 890,  # 1:55 PM
        "files": ["public/src/pages/member/MembershipCard.jsx"],
        "message": "Member Portal: Design digital membership card component"
    }
]

def run_command(cmd, cwd=None):
    """Execute shell command"""
    try:
        result = subprocess.run(
            cmd,
            cwd=cwd or REPO_PATH,
            shell=True,
            capture_output=True,
            text=True
        )
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def setup_git_repo():
    """Initialize git repo and add remote"""
    print("Setting up Git repository...")
    
    # Initialize git if not already
    run_command("git init")
    
    # Add remote
    run_command(f"git remote remove origin")  # Remove if exists
    success, _, _ = run_command(f"git remote add origin {REMOTE_URL}")
    
    if success:
        print("✓ Git repository initialized and remote added")
    else:
        print("✓ Git repository already configured")
    
    return True

def create_commit(commit_info, base_time):
    """Create a single commit with backdated timestamp"""
    offset_minutes = commit_info["time_offset"]
    commit_time = base_time + timedelta(minutes=offset_minutes)
    
    # Format timestamp for git
    timestamp = commit_time.strftime("%Y-%m-%d %H:%M:%S")
    
    print(f"\n[{commit_time.strftime('%I:%M %p')}] {commit_info['message']}")
    
    # Add files
    for file in commit_info["files"]:
        file_path = os.path.join(REPO_PATH, file)
        if os.path.exists(file_path):
            run_command(f'git add "{file}"')
            print(f"  ✓ Added: {file}")
        else:
            print(f"  ⚠ Skipped (not found): {file}")
    
    # Set environment variables for git commit date
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = timestamp
    env["GIT_COMMITTER_DATE"] = timestamp
    
    # Create commit
    commit_cmd = f'git commit -m "{commit_info["message"]}"'
    result = subprocess.run(
        commit_cmd,
        cwd=REPO_PATH,
        shell=True,
        env=env,
        capture_output=True,
        text=True
    )
    
    if result.returncode == 0:
        print(f"  ✓ Committed successfully")
        return True
    else:
        print(f"  ⚠ Commit failed: {result.stderr}")
        return False

def push_to_github():
    """Push all commits to GitHub"""
    print("\n" + "="*60)
    print("Pushing to GitHub...")
    print("="*60)
    
    # Set branch to main
    run_command("git branch -M main")
    
    # Push to remote
    success, stdout, stderr = run_command("git push -u origin main --force")
    
    if success:
        print("\n✓ Successfully pushed all commits to GitHub!")
        print(f"✓ Repository: {REMOTE_URL}")
    else:
        print(f"\n✗ Push failed: {stderr}")
        print("\nYou may need to authenticate or check your repository URL.")
    
    return success

def main():
    print("="*60)
    print("IEPSL Application System - Git Commit Script")
    print("="*60)
    print(f"Repository: {REPO_PATH}")
    print(f"Remote: {REMOTE_URL}")
    print(f"Commits: {len(commits)}")
    print(f"Time Range: {start_time.strftime('%Y-%m-%d %I:%M %p')} to {end_time.strftime('%Y-%m-%d %I:%M %p')}")
    print("="*60)
    
    # Change to repo directory
    os.chdir(REPO_PATH)
    
    # Setup git
    if not setup_git_repo():
        print("Failed to setup git repository")
        return
    
    # Create commits
    print("\nCreating commits...")
    successful_commits = 0
    
    for commit_info in commits:
        if create_commit(commit_info, start_time):
            successful_commits += 1
    
    print("\n" + "="*60)
    print(f"Created {successful_commits}/{len(commits)} commits")
    print("="*60)
    
    # Push to GitHub
    if successful_commits > 0:
        push_to_github()
    else:
        print("\nNo commits created. Please check your files.")

if __name__ == "__main__":
    main()
