using System.Collections.Generic;
using System.Linq;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        // private readonly RoleManager<Role> _roleManager;
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
            // UserManager<User> userManager, RoleManager<Role> roleManager
            // _userManager = userManager;
            // _roleManager = roleManager;
        }

        public void SeedUsers()
        {
            // if (!_userManager.Users.Any())
            // {
                 System.Console.WriteLine("user create outside");
            if (!_context.Users.Any())
            {
                System.Console.WriteLine("user create");
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                // var roles = new List<Role>
                // {
                //     new Role{Name = "Member"},
                //     new Role{Name = "Admin"},
                //     new Role{Name = "Moderator"},
                //     new Role{Name = "VIP"},
                // };

                // foreach (var role in roles)
                // {
                //     _roleManager.CreateAsync(role).Wait();
                // }

                foreach (var user in users)
                {
                    // user.Photos.SingleOrDefault().IsApproved = true;
                    // _userManager.CreateAsync(user, "password").Wait();
                    // _userManager.AddToRoleAsync(user, "Member").Wait();
                    byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.UserName = user.UserName.ToLower();

                    _context.Users.Add(user);

                }
            }
            _context.SaveChanges();
            // var adminUser = new User
            // {
            //     UserName = "Admin"
            // };

            // IdentityResult result = _userManager.CreateAsync(adminUser, "password").Result;

            // if (result.Succeeded)
            // {
            //     var admin = _userManager.FindByNameAsync("Admin").Result;
            //     _userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"}).Wait();
            // }
            //}
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}